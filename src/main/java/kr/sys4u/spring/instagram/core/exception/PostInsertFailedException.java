package kr.sys4u.spring.instagram.core.exception;

public class PostInsertFailedException extends RuntimeException {
	
	private static final long serialVersionUID = -9127280803166159390L;

	public PostInsertFailedException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PostInsertFailedException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public PostInsertFailedException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public PostInsertFailedException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

	public PostInsertFailedException(Exception e) {
		// TODO Auto-generated constructor stub
	}

}
