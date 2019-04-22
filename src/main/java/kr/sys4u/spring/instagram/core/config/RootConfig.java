package kr.sys4u.spring.instagram.core.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
@ComponentScan("kr.sys4u.spring.instagram.core")
public class RootConfig extends WebMvcConfigurationSupport{
	
//	@Override
//    protected void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new LoginIntercepter()).addPathPatterns("/**").excludePathPatterns("*.do");
//    }


}
