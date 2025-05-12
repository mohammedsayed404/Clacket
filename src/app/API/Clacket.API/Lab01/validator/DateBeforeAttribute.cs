using System.ComponentModel.DataAnnotations;

namespace Lab01.validator;

public class DateBeforeAttribute : ValidationAttribute
{
    private readonly int _year;

    public DateBeforeAttribute(int year)
    {
        _year = year;
        ErrorMessage = $"you have to insert Date before {_year}";
    }



    public override bool IsValid(object? value)
       => value is DateTime date && date.Year <= _year ;

}
