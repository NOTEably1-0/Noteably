package com.g3appdev.noteably.noteably;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class NoteablyApplication {

	public static void main(String[] args) {
		SpringApplication.run(NoteablyApplication.class, args);
	}

}
