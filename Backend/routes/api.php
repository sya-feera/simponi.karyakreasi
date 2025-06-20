<?php

use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\DormAssignmentController;
use App\Http\Controllers\DormController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\MudarisController;
use App\Http\Controllers\SantriController;
use App\Http\Controllers\SubjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//  ini untuk dropdown register santri
Route::get('/santrilist', [SantriController::class, 'availableSantri']);

// menambahkan data user baru kedalam database
Route::post('/register', [AuthController::class, 'register']);

// login
Route::post('/login', [AuthController::class, 'login']);

//  ini bagian mudaris atau user
route::middleware(['auth:api'])->group(function () {
    Route::get('/dorm_asigments', [DormAssignmentController::class, 'indexSantri']);
    Route::get('/grades', [GradeController::class, 'indexUser']);
    Route::apiResource('/santri', SantriController::class)->only('index','show');
    Route::apiResource('/classrooms', ClassroomController::class)->only('index');
    Route::apiResource('/dorms', DormController::class)->only('index');
    Route::apiResource('/subjects', SubjectController::class)->only('index');
    Route::apiResource('/mudaris', MudarisController::class)->only('index');
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');

    // ini bagian admin atau mudaris
    Route::middleware(['role:mudaris'])->group(function () {

        Route::apiResource('/dorm_asigments', DormAssignmentController::class)->only('show', 'store', 'update', 'destroy');
        Route::apiResource('/grades', GradeController::class)->only('show', 'store', 'update', 'destroy');
        Route::apiResource('/classrooms', ClassroomController::class)->only('show', 'store', 'update', 'destroy');
        Route::apiResource('/dorms', DormController::class)->only('show', 'store', 'update', 'destroy');
        Route::apiResource('/santri', SantriController::class)->only('store', 'destroy', 'update' );
        Route::apiResource('/subjects', SubjectController::class)->only('show', 'store', 'update', 'destroy');
        Route::apiResource('/mudaris', MudarisController::class)->only('show', 'store', 'update', 'destroy');
    });
});
