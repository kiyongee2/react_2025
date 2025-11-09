package com.springboot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.springboot.entity.Book;
import com.springboot.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BookService {
	
	private final BookRepository bookRepo;

	//도서 등록
	public Book save(Book book) {
		return bookRepo.save(book);
	}

	//도서 목록
	public List<Book> findAll() {
		return bookRepo.findAll();
	}

	//도서 정보
	public Book findById(Long id) {
		//Optional<Book> book = bookRepo.findById(id);
		//return book.get();
		return bookRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("도서를 찾을 수 없습니다."));
	}

	//도서 삭제
	public void delete(Long id) {
		bookRepo.deleteById(id);
	}

	//도서 수정
	public Book update(Long id, Book updatedBook) {
		Book book = findById(id);
		book.setTitle(updatedBook.getTitle());
		book.setAuthor(updatedBook.getAuthor());
		return bookRepo.save(book);
	}
	
	
}
