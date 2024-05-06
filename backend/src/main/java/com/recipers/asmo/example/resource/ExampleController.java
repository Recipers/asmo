package com.recipers.asmo.example.resource;

import com.recipers.asmo.example.dto.ExampleRequest;
import com.recipers.asmo.example.model.Example;
import com.recipers.asmo.example.service.ExampleService;
import jakarta.validation.Valid;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/examples")
@RequiredArgsConstructor
public class ExampleController {

  private final ExampleService exampleService;

  @GetMapping(path = "")
  public ResponseEntity<Page<Example>> findExamplesPage(
      @PageableDefault(size = 10, page = 0) Pageable pageable) {

    return ResponseEntity.status(HttpStatus.OK).body(exampleService.findExamplePages(pageable));
  }

  @PostMapping(path = "")
  public ResponseEntity<Void> createExample(@RequestBody @Valid ExampleRequest exampleRequest) {

    exampleService.createExample(exampleRequest);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @GetMapping(path = "/{id}")
  public ResponseEntity<Example> findExample(@PathVariable Long id) {

    Optional<Example> exampleOpt = exampleService.findExample(id);
    if (exampleOpt.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    Example example = exampleOpt.get();
    return ResponseEntity.status(HttpStatus.OK).body(example);
  }

  @PutMapping(path = "/{id}")
  public ResponseEntity<Void> updateExample(@PathVariable Long id,
      @RequestBody @Valid ExampleRequest exampleRequest) {

    exampleService.updateExample(id, exampleRequest);
    return ResponseEntity.status(HttpStatus.CREATED).build();
  }

  @DeleteMapping(path = "/{id}")
  public ResponseEntity<Void> deleteExample(@PathVariable Long id) {

    exampleService.deleteExample(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }

}
