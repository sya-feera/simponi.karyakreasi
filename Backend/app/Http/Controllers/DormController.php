<?php

namespace App\Http\Controllers;

use App\Models\Dorm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DormController extends Controller
{
    public function index()
    {
        $dorms = Dorm::with('mudaris')->get();;

        if ($dorms->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resouces data not found!"
            ], 200);
        }

        // return view('dorms',['dorms' => $dorms]);

        return response()->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $dorms
        ], 200);
    }
    public function store(Request $request)
    {
        // 1. Validasi input
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'capacity' => 'required|integer|min:1',
            'mudaris_id' => 'required|exists:mudaris,id',
        ]);

        // 2. Jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        // 3. Simpan data
        $dorms = Dorm::create([
            'name' => $request->name,
            'capacity' => $request->capacity,
            'mudaris_id' => $request->mudaris_id,
        ]);

        // 4. Kembalikan response
        return response()->json([
            'success' => true,
            'message' => 'Dorm created successfully!',
            'data' => $dorms
        ], 201);
    }

    public function show(string $id)
    {
        $dorms = Dorm::find($id);

        if (!$dorms) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get resources detail",
            "data" => $dorms
        ], 200);
    }

    public function update(string $id, Request $request)
    {

        $dorms = Dorm::find($id);

        if (!$dorms) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        // 1. validator
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'capacity' => 'required|integer|min:1',
            'mudaris_id' => 'required|exists:mudaris,id',
        ]);

        // 2. check validator error
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $data = [
            'name' => $request->name,
            'capacity' => $request->capacity,
            'mudaris_id' => $request->mudaris_id,
        ];

        $dorms->update($data);

        return response()->json([
            "success" => true,
            "message" => "resources updated",
            "data" => $dorms
        ], 200);
    }

    public function destroy(string $id)
    {
        $dorms = Dorm::find($id);

        if (!$dorms) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        $dorms->delete();

        return response()->json([
            "success" => true,
            "message" => "resources deleted",
        ], 204);
    }
}
