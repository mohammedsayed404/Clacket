using AutoMapper;
using Lab01.DTOs;
using Lab01.Models;

namespace Lab01.Mapping;

public class MappingProfiler : Profile
{

    public MappingProfiler()
    {
        CreateMap<Student, StudentToReadDto>();
        CreateMap<Department, DepartmentWithStudentsDto>();
    }
}
