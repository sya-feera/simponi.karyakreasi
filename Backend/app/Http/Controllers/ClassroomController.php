<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClassroomController extends Controller
{
    public function index()
    {
        $classrooms = Classroom::all();

        if ($classrooms->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resouces data not found!"
            ], 200);
        }

        // return view('classrooms',['classrooms' => $classrooms]);
        return response()->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $classrooms
        ], 200);
    }

    public function store(Request $request)
    {
        // 1. validator
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'location' => 'required|string',
        ]);

        // 2. check validator error
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }
        // 4. insert data
        $classrooms = Classroom::create([
            'name' => $request->name,
            'location' => $request->location,
        ]);

        // 5. response
        return response()->json([
            'success' => true,
            'message' => 'Resource added successfully!',
            'data' => $classrooms
        ], 201);
    }

    public function show(string $id)
    {
        $classrooms = Classroom::find($id);

        if (!$classrooms) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get resources detail",
            "data" => $classrooms
        ], 200);
    }

    public function update(string $id, Request $request)
    {

        $classrooms = Classroom::find($id);

        if (!$classrooms) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        // 1. validator
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'location' => 'required|string',
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
            'location' => $request->location,
        ];

        $classrooms->update($data);

        return response()->json([
            "success" => true,
            "message" => "resources updated",
            "data" => $classrooms
        ], 200);
    }

    public function destroy(string $id)
    {
        $classrooms = Classroom::find($id);

        if (!$classrooms) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        $classrooms->delete();

        return response()->json([
            "success" => true,
            "message" => "resources deleted",
        ], 204);
    }
}
