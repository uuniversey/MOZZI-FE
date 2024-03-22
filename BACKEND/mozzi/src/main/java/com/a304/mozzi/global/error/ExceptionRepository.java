package com.a304.mozzi.global.error;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExceptionRepository extends JpaRepository<ExceptionEntity, Integer> {
}
