namespace Lab01.Helper;

public class ApiValidationErrorResponse : ApiResponse
{
    public IEnumerable<string> Errors { get; set; }

    public ApiValidationErrorResponse()
        : base(StatusCodes.Status400BadRequest)
    {
        Errors = new List<string>();
    }

}
