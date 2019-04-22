package kr.sys4u.spring.instagram.core.intercepter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import kr.sys4u.spring.instagram.core.dto.member.Member;

public class LoginIntercepter extends HandlerInterceptorAdapter {
	public static Logger LOGGER = LoggerFactory.getLogger(LoginIntercepter.class);

	// Controller가 호출되기 전 수행
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		LOGGER.debug("----PRE_HANDLE---");

		HttpSession session = request.getSession();
		Member user = (Member) session.getAttribute("user");
		
//		idDupcheck.do //아작스 매핑주소는 안해도 되는듯..
//		주소값으로 파라미터값 들어올수도 있으니 uri주소에 매핑주소 들어있으면 으로 처리하기..
		if (user != null && request.getRequestURI().equals(request.getContextPath() + "/home.do")) {
			response.sendRedirect(request.getContextPath() + "/mainPage.do");
			return false;
		}
		
		if (request.getRequestURI().equals(request.getContextPath() + "/mainPage.do")) {
			if (user == null) {
				response.sendRedirect(request.getContextPath() + "/home.do");
				return false;
			}
		}
		
		
		return true;
	}

	// Controller가 완료된 이후에 수행
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		LOGGER.debug("POST_HANDLE");
	}

	// Controller 수행 후 view단 작업까지 완료 된 후 호출
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		LOGGER.debug("AFTER_COMPLETION");
	}

	@Override
	public void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		LOGGER.debug("AFTER_CONCURRENT_HANDLING_STARTED");
	}

}
