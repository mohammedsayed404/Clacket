namespace Lab01.Helper;

public class ApiResponse
{
    public int StatusCode { get; }
    public string Message { get; }
    public ApiResponse(int statusCode, string message = null!)
    {

        StatusCode = statusCode;
        Message = message ?? GetDefaultMessage(statusCode);
    }

    private string GetDefaultMessage(int statusCode)
     => statusCode switch
     {
         StatusCodes.Status404NotFound => "NotFount",
         StatusCodes.Status400BadRequest => "Bad Request",
         StatusCodes.Status500InternalServerError => "Internal Server Error",
         StatusCodes.Status401Unauthorized => "Unauthorized Error ",

         _ => null!
     };
}
