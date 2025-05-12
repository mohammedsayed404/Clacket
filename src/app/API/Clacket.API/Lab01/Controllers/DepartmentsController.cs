using AutoMapper;
using Lab01.Data;
using Lab01.DTOs;
using Lab01.validator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lab01.Controllers;


[Authorize(Policy = "AllowAdmin")]
public class DepartmentsController : ApiControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly IMapper _mapper;

    public DepartmentsController(AppDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }


    [HttpGet]
    [OverSekaFilter]
    public ActionResult<IReadOnlyList<DepartmentWithStudentsDto>> GetDepartments()
    {


        var departmentWithStudents = _dbContext.Departments
                                               .Include(department => department.Students)
                                               .ToList();


        var mappedDepartmentWithStudentDto
            = _mapper.Map<IReadOnlyList<DepartmentWithStudentsDto>>(departmentWithStudents);

        if (mappedDepartmentWithStudentDto is not null)
            return Ok(mappedDepartmentWithStudentDto);



        return new List<DepartmentWithStudentsDto>();
    }



}
