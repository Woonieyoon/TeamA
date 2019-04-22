package kr.sys4u.spring.instagram.web.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

import kr.sys4u.spring.instagram.core.intercepter.LoginIntercepter;

@Configuration
@EnableWebMvc
@ComponentScan("kr.sys4u.spring.instagram.web")
@PropertySource("classpath:/application.properties")
public class WebConfig extends WebMvcConfigurerAdapter{

	@Autowired
	Environment environment;
	
	@Override
	public void configureViewResolvers(ViewResolverRegistry registry) {
		InternalResourceViewResolver resolver = new InternalResourceViewResolver();
		resolver.setExposeContextBeansAsAttributes(true);
		resolver.setPrefix("/WEB-INF/jsp/");
		resolver.setSuffix(".jsp");
		resolver.setViewClass(JstlView.class);
		registry.viewResolver(resolver);
	}
	
	@Bean
	public MultipartResolver multipartResolver() throws IOException {
		String tempDir = environment.getProperty("fileupload-tmp-dir", String.class, "c:/temp");
		long maxSize = environment.getProperty("fileupload-max-size", Long.class, 10 * 1024 * 1024L);
		int minSize = environment.getProperty("fileupload-min-size", Integer.class, 0);
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
		multipartResolver.setUploadTempDir(new FileSystemResource(tempDir));
		multipartResolver.setMaxUploadSize(maxSize);
		multipartResolver.setMaxInMemorySize(minSize);
		return multipartResolver;
	}
	
	@Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginIntercepter());
    }

}
