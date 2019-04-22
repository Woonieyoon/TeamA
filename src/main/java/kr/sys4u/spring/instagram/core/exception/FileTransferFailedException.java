package kr.sys4u.spring.instagram.core.exception;

public class FileTransferFailedException extends RuntimeException {
	public FileTransferFailedException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public FileTransferFailedException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public FileTransferFailedException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public FileTransferFailedException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

	private static final long serialVersionUID = -9127280803166159389L;

	public FileTransferFailedException(Exception e) {
		// TODO Auto-generated constructor stub
	}

}
