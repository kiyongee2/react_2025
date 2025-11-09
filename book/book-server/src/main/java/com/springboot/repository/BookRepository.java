package com.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long>{

}
