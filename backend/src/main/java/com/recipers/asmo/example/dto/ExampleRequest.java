package com.recipers.asmo.example.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ExampleRequest {

  @NotBlank(message = "내용 입력 필수!")
  private String content;

}
