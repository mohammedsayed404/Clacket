using Lab01.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Lab01.validator;

public class OverSekaFilterAttribute : ResultFilterAttribute
{



    public override void OnResultExecuting(ResultExecutingContext context)
    {

        if (context.Result is ObjectResult objectResult
            && objectResult.Value is IReadOnlyList<DepartmentWithStudentsDto> departments)
        {
            if (departments.Any(department => department.students.Count > 5))
            {
                context.ModelState.AddModelError("overload", "Overloaded Seka ya man");

                context.Result = new BadRequestObjectResult(context.ModelState);
            }



        }

    }

}
