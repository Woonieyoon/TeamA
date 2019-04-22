package kr.sys4u.spring.instagram.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

public abstract class AbstractController {
	public static Logger LOGGER = LoggerFactory.getLogger(AbstractController.class);
	
	@Autowired
	public Environment environment;
}
