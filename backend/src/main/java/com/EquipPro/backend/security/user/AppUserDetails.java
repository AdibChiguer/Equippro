package com.EquipPro.backend.security.user;

import com.EquipPro.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppUserDetails implements UserDetails{
    private String cin;
    private String email;
    private String password;
    private Collection<GrantedAuthority> authorities;

    public static AppUserDetails buildUserDetails(User user){
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getName());
        List<GrantedAuthority> authorities = Collections.singletonList(authority);
        return new AppUserDetails(
                user.getCin(),
                user.getEmail(),
                user.getPassword(),
                authorities);
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
    }
}
