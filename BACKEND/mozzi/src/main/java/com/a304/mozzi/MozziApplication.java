package com.a304.mozzi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MozziApplication {

	public static void main(String[] args) {
		SpringApplication.run(MozziApplication.class, args);
	}

}
