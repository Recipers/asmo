package com.recipers.asmo.example.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "EXAMPLE")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Example {

  @Id
  @Column(name = "EXAMPLE_ID")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "EXAMPLE_CONTENT")
  private String content;


  public Example(String content) {
    this();
    this.content = content;
  }


  public void updateContent(String content) {
    this.content = content;
  }

}
