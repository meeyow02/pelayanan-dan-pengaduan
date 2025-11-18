<?php

namespace App\Repositories;

use App\Models\User;

class UserListRepository implements UserListRepositoryInterface
{
    protected $UserList;

    public function __construct(User $UserList)
    {
        $this->UserList = $UserList;
    }

    public function getAll($search = null, $limit = 10)
    {
        $query = $this->UserList->query();

        if ($search) {
            $query->where('name', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%")
                ->orWhere('username', 'LIKE', "%{$search}%")
                ->orWhere('phone_number', 'LIKE', "%{$search}%");
        }

        return $query->paginate($limit);
    }

    public function findById(int $id)
    {
        return $this->UserList::where('id', $id)->first();
    }

    public function store(array $data)
    {
        return $this->UserList::create($data);
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
