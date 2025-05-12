using Lab01.Data;
using Lab01.validator;
using System.ComponentModel.DataAnnotations;

namespace Lab01.Models;

public class Student : EntityBase<int>
{

    [StringLength(50,MinimumLength =3)]
    public string Name { get; set; } = null!;

    [Range(18,25)]
    public int Age { get; set; }

    [DateBefore(2013)]
    public DateTime DOB { get; set; }

    [RegularExpression("^[A-Za-z\\s]+$" , ErrorMessage = "address must be characters only")]
    public string Address { get; set; } = null!;

    [RegularExpression(@"^.*\.(jpg|png)$" , ErrorMessage ="image must be .jpg or png")]
    public string Image { get; set; } = null!;

    [EmailAddress]
    [UniqueEmail]
    public string Email { get; set; } = null!;

    public int? DepartmentId { get; set; }
    public Department? Department { get; set; }



}
