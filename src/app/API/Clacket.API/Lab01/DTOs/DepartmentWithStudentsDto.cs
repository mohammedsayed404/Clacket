namespace Lab01.DTOs;

public record DepartmentWithStudentsDto
    (
    
    int id , 
    string name , 
    string managerName, 
    string location, 
    IReadOnlyList<StudentToReadDto> students
    
    );
