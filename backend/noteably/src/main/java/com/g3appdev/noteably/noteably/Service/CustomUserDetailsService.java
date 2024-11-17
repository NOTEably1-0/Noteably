package com.g3appdev.noteably.noteably.Service;

import com.g3appdev.noteably.noteably.Entity.StudentEntity;
<<<<<<< HEAD
import com.g3appdev.noteably.noteably.Repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private StudentRepo studentRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        StudentEntity student = studentRepo.findByEmail(username);
        if (student == null) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }
        return new org.springframework.security.core.userdetails.User(student.getEmail(), student.getPassword(), new ArrayList<>());
=======
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetailsService implements UserDetails {
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;


    public CustomUserDetailsService(StudentEntity student) {
        this.email = student.getEmail();
        this.password = student.getPassword();
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_STUDENT"));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
>>>>>>> 77a65bd6b05444d04b33bd2aa8719406e0a69422
    }
}
