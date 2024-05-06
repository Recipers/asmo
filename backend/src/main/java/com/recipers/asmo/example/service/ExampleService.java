package com.recipers.asmo.example.service;

import com.recipers.asmo.example.dto.ExampleRequest;
import com.recipers.asmo.example.mapper.ExampleMapper;
import com.recipers.asmo.example.model.Example;
import com.recipers.asmo.example.repository.ExampleRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
//@Component
public class ExampleService {

  private final ExampleRepository exampleRepository;

  private final ExampleMapper exampleMapper;

  public Page<Example> findExamplePages(Pageable pageable) {

    return exampleRepository.findAll(pageable);
  }

  public Optional<Example> findExample(Long id) {

    return exampleRepository.findById(id);
  }

  public void createExample(ExampleRequest exampleRequest) {

    Example example = exampleMapper.toExample(exampleRequest);
    exampleRepository.save(example);
  }

  public void updateExample(Long id, ExampleRequest exampleRequest) {

    Example example = exampleRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("cannot find example"));
    example.updateContent(exampleRequest.getContent());
    exampleRepository.save(example);
  }

  public void deleteExample(Long id) {

    exampleRepository.deleteById(id);
  }

}
