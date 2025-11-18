<?php

namespace App\Repositories;

interface UserListRepositoryInterface
{
    public function getAll(string $search);
    public function findById(int $id);
    public function store(array $data);
    public function update(int $id, array $data);
    public function updateStatus(int $id, string $status);
    public function delete(int $id);
}
