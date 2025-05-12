using Lab01.Data;
using System.ComponentModel.DataAnnotations;

namespace Lab01.validator
{
    public class UniqueNameAttribute : ValidationAttribute
    {
        public UniqueNameAttribute() => ErrorMessage = "you have to insert Name";
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {

            using (var scope = validationContext.CreateScope())
            {
                using (var _dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>())
                {
                    if (value is null)
                        return new ValidationResult(ErrorMessage);

                    if (value is string name)
                        return _dbContext.Departments.Any(department => department.Name.ToLower() == name.ToLower()) ?
                                new ValidationResult("Name taken before") : ValidationResult.Success;
                    else
                        return new ValidationResult(ErrorMessage);

                }
            }

        }
    }
}
