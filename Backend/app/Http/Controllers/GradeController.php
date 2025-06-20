<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Santri;
// use App\Models\grades;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class GradeController extends Controller
{



    public function indexUser()
    {
        $user = auth('api')->user();

        if ($user->role === 'santri') {
            $santri =Santri::where('user_id', $user->id)->first();

            if (!$santri) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data santri tidak ditemukan'
                ], 404);
            }

            $grades = Grade::with([
                'santri',
                'subject.classroom',
                'subject.mudaris'
            ])->where('santri_id', $santri->id)->get();
        } elseif ($user->role === 'mudaris') {
            $grades = Grade::with([
                'santri',
                'subject.classroom',
                'subject.mudaris'
            ])->get();
            
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access.'
            ], 403);
        }

        if ($grades->isEmpty()) {
            return response()->json([
                'success' => true,
                'message' => 'Data jadwal tidak ditemukan'
            ], 200);
        }

        return response()->json([
            'success' => true,
            'message' => 'Berhasil mengambil data jadwal',
            'data' => $grades
        ], 200);
    }
    public function index()
    {
        $grades = Grade::with([
            'santri',
            'subject.classroom',
            'subject.mudaris'
        ])->get();

        if ($grades->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resouces data not found!"
            ], 200);
        }

        // return view('grades',['grades' => $grades]);

        return response()->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $grades
        ], 200);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'santri_id' => 'required|exists:santri,id',
            'subject_id' => 'required|exists:subjects,id',
            'grade' => 'required|integer|min:0|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $grades = Grade::Create([
            'santri_id' => $request->santri_id,
            'subject_id' => $request->subject_id,
            'grade' => $request->grade
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Grade saved successfully!',
            'data' => $grades
        ], 201);
    }

    public function update(string $id, Request $request)
    {

        $grades = Grade::find($id);

        if (!$grades) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        // 1. validator
        $validator = Validator::make($request->all(), [
            'santri_id' => 'required|exists:santri,id',
            'subject_id' => 'required|exists:subjects,id',
            'grade' => 'required|integer|min:0|max:100',
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
            'subject_id' => $request->subject_id,
            'grade' => $request->grade
        ];

        $grades->update($data);

        return response()->json([
            "success" => true,
            "message" => "resources updated",
            "data" => $grades
        ], 200);
    }

    public function show(string $id)
    {
        $grades = Grade::find($id);

        if (!$grades) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get resources detail",
            "data" => $grades
        ], 200);
    }

    public function destroy(string $id)
    {
        $grades = Grade::find($id);

        if (!$grades) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        $grades->delete();

        return response()->json([
            "success" => true,
            "message" => "resources deleted",
        ], 204);
    }
}
