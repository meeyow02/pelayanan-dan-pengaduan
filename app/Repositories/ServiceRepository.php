<?php

namespace App\Repositories;

use App\Models\Service;

class ServiceRepository implements ServiceRepositoryInterface
{
    protected $Service;

    public function __construct(Service $Service)
    {
        $this->Service = $Service;
    }

    public function getAll($search = null)
    {
        $query = $this->Service::with('serviceCategory', 'user');
        $user = auth()->user();

        if ($search) {
            $query->where('description', 'LIKE', '%' . $search . '%');
        }

        if ($user->role === 'user') {
            $query->where('user_id', $user->id);
        }

        return $query
            ->orderBy('created_at', 'desc')
            ->paginate(10);
    }

    public function findById(int $id)
    {
        return $this->Service::with('serviceCategory')->where('id', $id)->first();
    }

    public function store(array $data)
    {
        return $this->Service::create($data);
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
