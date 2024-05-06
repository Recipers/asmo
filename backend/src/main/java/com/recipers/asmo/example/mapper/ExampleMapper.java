package com.recipers.asmo.example.mapper;

import com.recipers.asmo.example.dto.ExampleRequest;
import com.recipers.asmo.example.model.Example;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ExampleMapper {

  Example toExample(ExampleRequest exampleRequest);

}
