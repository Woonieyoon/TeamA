package kr.sys4u.spring.instagram.core.exception;

public class UserNotAuthenticatedException extends RuntimeException{
	private static final long serialVersionUID = 5892748086039607543L;

	public UserNotAuthenticatedException() {
		super();
	}

	public UserNotAuthenticatedException(String message, Throwable cause) {
		super(message, cause);
	}

	public UserNotAuthenticatedException(String message) {
		super(message);
	}

	public UserNotAuthenticatedException(Throwable cause) {
		super(cause);
	}

	
	
}
