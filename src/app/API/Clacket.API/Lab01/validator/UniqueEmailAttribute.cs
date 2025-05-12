using Lab01.Data;
using System.ComponentModel.DataAnnotations;

namespace Lab01.validator;

public class UniqueEmailAttribute : ValidationAttribute
{

    public UniqueEmailAttribute() => ErrorMessage = "you have to insert Email";

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {

        using(var scope  = validationContext.CreateScope())
        {
            using(var _dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>())
            {
                if (value is null)
                    return new ValidationResult(ErrorMessage);

                if (value is string email)
                    return _dbContext.Students.Any(student => student.Email.ToLower() == email.ToLower()) ?
                            new ValidationResult("Email taken before") : ValidationResult.Success;
                else
                    return new ValidationResult(ErrorMessage);

            }
        }



       

    }

}
