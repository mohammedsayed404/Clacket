using Lab01.Data;
using Lab01.Helper;
using Lab01.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Lab01.Controllers;


[Authorize]
public class StudentsController : ApiControllerBase
{
    private readonly AppDbContext _dbContext;

    public StudentsController(AppDbContext context) => _dbContext = context;


    [HttpGet]
    public ActionResult<IReadOnlyList<Student>> GetStudents()
        => Ok(_dbContext.Students.AsNoTracking().ToList());

    [HttpGet("{id}")]
    public ActionResult<Student> GetStudentById(int id)
    {
        var student = _dbContext.Students.Find(id);

        if (student is null)
            return NotFound(
                new ApiResponse((int)HttpStatusCode.NotFound, $"There is no std with id {id} "));

        return Ok(student);
    }


    [HttpGet("{name:alpha}")]
    public ActionResult<Student> GetStudentByName(string name)
    {
        var student = _dbContext.Students.FirstOrDefault(student => student.Name.ToLower() == name);

        if (student is null)
            return NotFound();

        return Ok(student);
    }


    [HttpPut("{id}")]
    public IActionResult EditStudent(int id, Student student)
    {
        if (id != student?.Id)
            return BadRequest();

        _dbContext.Students.Update(student);
        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpPost]
    public ActionResult<Student> AddStudent(Student student)
    {
        _dbContext.Students.Add(student);
        _dbContext.SaveChanges();

        return CreatedAtAction(nameof(GetStudentById), new { id = student?.Id }, student);
    }


    [HttpDelete("{id}")]
    public IActionResult DeleteStudent(int id)
    {
        var student = _dbContext.Students.Find(id);
        if (student is null)
            return NotFound();

        _dbContext.Students.Remove(student);
        _dbContext.SaveChanges();

        return NoContent();
    }


}
