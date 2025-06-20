<?php

namespace App\Http\Controllers;

use App\Models\Dorm;
use App\Models\DormAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class DormAssignmentController extends Controller
{
    public function indexSantri()
    {
        $user = auth('api')->user();

        if ($user->role === 'santri') {
            $santri = \App\Models\Santri::where('user_id', $user->id)->first();

            if (!$santri) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data santri tidak ditemukan'
                ], 404);
            }

            $kamar = DormAssignment::with(['dorm', 'santri'])
                ->where('santri_id', $santri->id)
                ->get();

        } elseif ($user->role === 'mudaris') {
            $kamar = DormAssignment::with(['dorm', 'santri'])->get();

        } else {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access.'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $kamar
        ]);
    }

    public function index()
    {
        $assignments = DormAssignment::with(
            'santri',
            'dorm.mudaris'
        )->get();

        if ($assignments->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resouces data not found!"
            ], 200);
        }

        // return view('dorm_assignments',['dorm_assignments' => $dorm_ssignments]);

        return response()->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $assignments
        ], 200);
    }

    public function store(Request $request)
    {
        // 1. Validasi
        $validator = Validator::make($request->all(), [
            'santri_id' => 'required|exists:santri,id',
            'dorm_id' => 'required|exists:dorms,id',
            'entry_date' => 'required|date',
            'exit_date' => 'nullable|date|after_or_equal:entry_date',
        ]);

        // 2. Jika gagal validasi
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $dorm = Dorm::find($request->dorm_id);

        $currentCount = DormAssignment::where('dorm_id', $dorm->id)
            ->where(function ($query) {
                $query->whereNull('exit_date')
                    ->orWhere('exit_date', '>', now());
            })
            ->count();

        // 5. Cek apakah kapasitas sudah penuh
        if ($currentCount >= $dorm->capacity) {
            return response()->json([
                'success' => false,
                'message' => 'Kamar sudah penuh.'
            ], 409);
        }

        // 3. Simpan data
        $assignments = DormAssignment::create([
            'santri_id' => $request->santri_id,
            'dorm_id' => $request->dorm_id,
            'entry_date' => $request->entry_date,
            'exit_date' => $request->exit_date,
        ]);

        // 4. Response sukses
        return response()->json([
            'success' => true,
            'message' => 'Dorm assignment created successfully!',
            'data' => $assignments
        ], 201);
    }

    public function update(string $id, Request $request)
    {

        $assignments = DormAssignment::find($id);

        if (!$assignments) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        // 1. validator
        $validator = Validator::make($request->all(), [
            'santri_id' => 'required|exists:santri,id',
            'dorm_id' => 'required|exists:dorms,id',
            'entry_date' => 'required|date',
            'exit_date' => 'nullable|date|after_or_equal:entry_date',
        ]);

        // 2. check validator error
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $data = [
            'santri_id' => $request->santri_id,
            'dorm_id' => $request->dorm_id,
            'entry_date' => $request->entry_date,
            'exit_date' => $request->exit_date,
        ];

        $assignments->update($data);

        return response()->json([
            "success" => true,
            "message" => "resources updated",
            "data" => $assignments
        ], 200);
    }

    public function show(string $id)
    {
        $assignments = DormAssignment::find($id);

        if (!$assignments) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get resources detail",
            "data" => $assignments
        ], 200);
    }

    public function destroy(string $id)
    {
        $assignments = DormAssignment::find($id);

        if (!$assignments) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        $assignments->delete();

        return response()->json([
            "success" => true,
            "message" => "resources deleted",
        ], 204);
    }
}
