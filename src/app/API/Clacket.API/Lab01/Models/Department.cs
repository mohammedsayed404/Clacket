using Lab01.Data;
using Lab01.validator;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lab01.Models;

public class Department : EntityBase<int>
{

    [UniqueName]
    public string Name { get; set; } = null!;

    public string ManagerName { get; set; } = null!;

    public string Location { get; set; } = null!;

    public ICollection<Student>? Students { get; set; } = new HashSet<Student>();

}
