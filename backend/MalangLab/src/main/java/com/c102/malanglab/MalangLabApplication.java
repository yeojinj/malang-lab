package com.c102.malanglab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class MalangLabApplication {

	public static void main(String[] args) {
		SpringApplication.run(MalangLabApplication.class, args);
	}

}
