const handleErrors = (err, _req, res, next) => {
	if (err) {
		console.error(err);
		res.status(500).send({
			message: err.message,
			error: err,
		});
	}
	next();
};

export default handleErrors;
