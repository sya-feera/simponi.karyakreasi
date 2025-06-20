<?php

namespace App\Http\Controllers;

use App\Models\Mudaris;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class MudarisController extends Controller
{

    public function index()
    {
        $mudaris = Mudaris::all();

        if ($mudaris->isEmpty()) {
            return response()->json([
                "success" => true,
                "message" => "Resouces data not found!"
            ], 200);
        }

        // return view('mudaris',['mudaris' => $mudaris]);

        return response()->json([
            "success" => true,
            "message" => "Get All Resources",
            "data" => $mudaris
        ], 200);
    }
    public function store(Request $request)
    {
        // 1. Validasi data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            // 'gender' => 'required|in:Laki-laki,Perempuan',
            'address' => 'nullable|string',
            'no_hp' => 'nullable|string|max:25',
            'pp_mudaris' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
        ]);

        // 2. Jika validasi gagal
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $imageName = null;
        if ($request->hasFile('pp_mudaris')) {
            $image = $request->file('pp_mudaris');
            $image->store('mudaris', 'public');
            $imageName = $image->hashName();
        }

        // 3. Simpan ke DB
        $mudaris = Mudaris::create([
            'name' => $request->name,
            'gender' => $request->gender,
            'address' => $request->address,
            'no_hp' => $request->no_hp,
            'pp_mudaris' => $imageName,
        ]);


        // 4. Response
        return response()->json([
            'success' => true,
            'message' => 'Mudaris added successfully!',
            'data' => $mudaris
        ], 201);
    }

    public function show(string $id)
    {
        $mudaris = Mudaris::find($id);

        if (!$mudaris) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        return response()->json([
            "success" => true,
            "message" => "Get resources detail",
            "data" => $mudaris
        ], 200);
    }

    public function update(string $id, Request $request)
    {

        $mudaris = Mudaris::find($id);

        if (!$mudaris) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        // 1. validator
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            // 'gender' => 'required|in:Laki-laki,Perempuan',
            'address' => 'nullable|string',
            'no_hp' => 'nullable|string|max:25',
            'pp_mudaris' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
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
            // 'gender' => $request->gender,
            'address' => $request->address,
            'no_hp' => $request->no_hp,
        ];

        if ($request->hasFile('pp_mudaris')) {
            $image = $request->file('pp_mudaris');
            $image->store('mudaris', 'public');

            if ($mudaris->pp_mudaris) {
                Storage::disk('public')->delete('mudaris/' . $mudaris->pp_mudaris);
            }

            $data['pp_mudaris'] = $image->hashName();
        }

        $mudaris->update($data);

        return response()->json([
            "success" => true,
            "message" => "resources updated",
            "data" => $mudaris
        ], 200);
    }

    public function destroy(string $id)
    {
        $mudaris = Mudaris::find($id);

        if (!$mudaris) {
            return response()->json([
                "success" => false,
                "message" => "resources not found"
            ], 404);
        }

        if ($mudaris->pp_mudaris) {
            Storage::disk('public')->delete('mudaris/' . $mudaris->pp_mudaris);
        }

        $mudaris->delete();

        return response()->json([
            "success" => true,
            "message" => "resources deleted",
        ], 204);
    }
}
