export default function prepareErrorMessages(err) {
	const errorMessages = {};

	err.inner.forEach(error => {
		errorMessages[error.path] = error.message;
	});

	return errorMessages;
}
