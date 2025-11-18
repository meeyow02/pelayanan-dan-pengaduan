<?php

namespace App\Services;

use App\Repositories\UserListRepositoryInterface;

class UserListService
{
    public function __construct(
        protected UserListRepositoryInterface $UserListRepository
    ) {
    }

    public function getAll($search = null)
    {
        return $this->UserListRepository->getAll($search);
    }

    public function findById(int $id)
    {
        return $this->UserListRepository->findById($id);
    }

    public function store(array $data)
    {
        return $this->UserListRepository->store($data);
    }

    public function update(int $id, array $data)
    {
        return $this->UserListRepository->update($id, $data);
    }
    
    public function updateStatus(int $id, string $status)
    {
        return $this->UserListRepository->updateStatus($id, $status);
    }

    public function delete(int $id)
    {
        return $this->UserListRepository->delete($id);
    }
}