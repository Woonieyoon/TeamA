package kr.sys4u.spring.instagram.core.exception;

public class MissingRequiredValueException extends RuntimeException{
	public MissingRequiredValueException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public MissingRequiredValueException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public MissingRequiredValueException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public MissingRequiredValueException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

	private static final long serialVersionUID = 4826158332004401016L;

}
