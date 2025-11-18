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

    public function getAll($search = null, $limit = 10)
    {
        $query = $this->Service::with('serviceCategory', 'user');
        $user = auth()->user();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('description', 'LIKE', '%' . $search . '%')
                    ->orWhereHas('serviceCategory', function ($q2) use ($search) {
                        $q2->where('name', 'LIKE', '%' . $search . '%');
                    });

                $timestamp = strtotime($search);
                if ($timestamp !== false) {
                    $year = date('Y', $timestamp);
                    $month = date('m', $timestamp);
                    $day = date('d', $timestamp);

                    $q->orWhereDate('created_at', $year . '-' . $month . '-' . $day)
                        ->orWhereYear('created_at', $year)
                        ->orWhereMonth('created_at', $month);
                }
            });
        }

        if ($user->role === 'user') {
            $query->where('user_id', $user->id);
        }

        return $query
            ->orderBy('created_at', 'desc')
            ->paginate($limit);
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
