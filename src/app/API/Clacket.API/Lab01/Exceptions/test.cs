using Lab01.Helper;

namespace Lab01.Exceptions;

public class ApiExceptionResponse : ApiResponse
{
    public string Description { get; }

    public ApiExceptionResponse(string description, string message = null!)
        : base(StatusCodes.Status500InternalServerError, message)
    {
        Description = description;

    }

}