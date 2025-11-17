<?php

namespace App\Repositories;

use App\Models\Complaint;

class ComplaintRepository implements ComplaintRepositoryInterface
{
    protected $Complaint;

    public function __construct(Complaint $Complaint)
    {
        $this->Complaint = $Complaint;
    }

    public function getAll($search = null)
    {
        $query = $this->Complaint::with('complaintCategory');
        $user = auth()->user();

        if ($search) {
            $query->where('complaint_number', 'LIKE', '%' . $search . '%');
        }

        if ($user->role === 'user') {
            $query->where('user_id', $user->id);
        }

        return $query->paginate(10);
    }

    public function findById(int $id)
    {
        return $this->Complaint::where('id', $id)->with('complaintCategory')->first();
    }

    public function store(array $data)
    {
        return $this->Complaint::create($data);
    }

    public function update(int $id, array $data)
    {
        $model = $this->findById($id);
        return $model ? $model->update($data) : null;
    }

    public function updateStatus(int $id, string $status)
    {
        $model = $this->findById($id);
        if (!$model) {
            return null;
        }

        $model->status = $status;
        $model->save();

        return $model;
    }

    public function delete(int $id)
    {
        $model = $this->findById($id);
        return $model ? $model->delete() : null;
    }
}
