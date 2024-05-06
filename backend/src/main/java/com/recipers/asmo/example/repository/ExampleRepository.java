package com.recipers.asmo.example.repository;

import com.recipers.asmo.example.model.Example;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExampleRepository extends JpaRepository<Example, Long> {

}
