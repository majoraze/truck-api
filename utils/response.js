module.exports.responseSuccess = (body) => {
  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
}

module.exports.responseCreatedSuccess = (body) => {
  return {
    statusCode: 201,
    body: JSON.stringify(body)
  }
}

module.exports.responseNotfound = (body) => {
  return {
    statusCode: 404,
    body: JSON.stringify({ statusCode: 404, message: body.message })
  }
}

module.exports.responseInternalError = (body) => {
  return {
    statusCode: 500,
    body: JSON.stringify({ statusCode: 500, message: body.message })
  }
}
