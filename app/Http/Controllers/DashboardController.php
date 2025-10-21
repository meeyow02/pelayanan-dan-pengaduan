<?php

namespace App\Http\Controllers;

use App\Services\ComplaintService;
use App\Services\ServiceService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        private ComplaintService $complaintService,
        private ServiceService $serviceService
    ) {
    }

    public function index()
    {
        $data = [
            'total_service' => $this->serviceService->getAll()->count(),
            'total_complaint' => $this->complaintService->getAll()->count(),
            'total_pending_service' => $this->serviceService->getAll()->where('status', 'pending')->count(),
            'total_on_progress_service' => $this->serviceService->getAll()->where('status', 'on_progress')->count(),
            'total_cancel_service' => $this->serviceService->getAll()->where('status', 'cancel')->count(),
            'total_completed_service' => $this->serviceService->getAll()->where('status', 'completed')->count(),
            'total_pending_complaint' => $this->complaintService->getAll()->where('status', 'pending')->count(),
            'total_on_progress_complaint' => $this->complaintService->getAll()->where('status', 'on_progress')->count(),
            'total_cancel_complaint' => $this->complaintService->getAll()->where('status', 'cancel')->count(),
            'total_completed_complaint' => $this->complaintService->getAll()->where('status', 'completed')->count(),
        ];

        return Inertia::render('Dashboard', compact('data'));
    }
}
