<?php

namespace App\Http\Controllers;

use App\Models\Mudaris;
use App\Models\Santri;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function showSignupForm()
    {
        return view('auth.signup');
    }
    public function register(Request $request)
    {
        // 1. validator
        $validator = Validator::make($request->all(), [
            'santri_id' => 'required|exists:santri,id',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|min:8'
        ]);

        // 2. check validator error
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 422);
        }

        $santri = Santri::findOrFail($request->santri_id);

        $user = User::create([
            'name' => $santri->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),

        ]);

        $santri->user_id = $user->id;
        $santri->save();

        if ($user) {
            return response()->json([
                'success' => true,
                'message' => 'User created Successfully',
                'data' => $user
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'User creation fail',
        ], 409); // conflict
    }


    public function showLoginForm()
    {
        return view('auth.login');
    }
    public function login(Request $request)
    {
        $validator = validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');

        if (!$token = auth()->guard('api')->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'email atau password salah'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'message' => 'Login Berhasil',
            'user'    => auth()->guard('api')->user(),
            'token'   => $token
        ], 200);
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'success' => true,
                'message' => 'Logout Successfully',
            ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Logout Failed!',
            ], 500);
        }

        auth()->guard('api')->logout();
        return response()->json([
            'success' => true,
            'message' => 'Logout Berhasil'
        ], 200);
    }
}
