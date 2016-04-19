<?php

namespace App\Http\Controllers;

class ApiController extends Controller
{
    /**
     * @var int
     */
    protected $statusCode = 200;

    /**
     * Get the status code for a response (defaults to 200).
     *
     * @return int
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * Set the status code of a response.
     *
     * @param $code
     * @return $this
     */
    public function setStatusCode($code)
    {
        $this->statusCode = $code;

        return $this;
    }

    /**
     * Send a JSON response with data, a response code, and optional headers.
     *
     * @param $data
     * @param array $headers
     * @return \Illuminate\Http\JsonResponse
     */
    public function respond($data, $headers = [])
    {
        return response()->json($data, $this->getStatusCode(), $headers);
    }

    /**
     * Responds with a message (generally a success message)
     *
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondWithMessage($message)
    {
        return $this->respond(['message' => $message]);
    }

    /**
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondBadRequest($message = "Bad Request!")
    {
        return $this->setStatusCode(400)->respondWithError($message);
    }

    /**
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondUnauthorized($message = "Unauthorized!")
    {
        return $this->setStatusCode(401)->respondWithError($message);
    }

    /**
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondNotFound($message = 'Not Found!')
    {
        return $this->setStatusCode(404)->respondWithError($message);
    }

    /**
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondAlreadyExists($message = "Already Exists!")
    {
        return $this->setStatusCode(409)->respondWithError($message);
    }

    /**
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondUnprocessableEntity($message = "Unprocessable Entity")
    {
        return $this->setStatusCode(422)->respondWithError($message);
    }

    /**
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondInternalError($message = "Internal Error!")
    {
        return $this->setStatusCode(500)->respondWithError($message);
    }

    /**
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    private function respondWithError($message)
    {
        return $this->respond([
            'error' => [
                'message' => $message
            ]
        ]);
    }
}