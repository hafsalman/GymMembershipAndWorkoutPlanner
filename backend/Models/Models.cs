using System;
using System.Collections.Generic;

namespace GymMembershipAPI.Models
{
    // Trainer Model
    public class Trainer
    {
        public int TrainerId { get; set; }
        public string TName { get; set; }
        public string TDescription { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime JoinDateTime { get; set; }
        public float Salary { get; set; }
        public string Password { get; set; }
        public string Specialization { get; set; }

        // Navigation properties
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();
        public ICollection<Member> Members { get; set; } = new List<Member>();
        public ICollection<Health> HealthRecords { get; set; } = new List<Health>();
        public ICollection<Message> SentMessages { get; set; } = new List<Message>();
        public ICollection<Message> ReceivedMessages { get; set; } = new List<Message>();
    }

    // Member Model
    public class Member
    {
        public int MemberId { get; set; }
        public string MName { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public string Username { get; set; }
        public DateTime DOB { get; set; }
        public DateTime JoinDateTime { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public float Height { get; set; }
        public float Weight { get; set; }
        public int CoreStrength { get; set; }
        public string FitnessGoal { get; set; }
        public string Password { get; set; }

        // Navigation properties
        public int? TrainerId { get; set; }
        public Trainer Trainer { get; set; }
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public ICollection<Health> HealthRecords { get; set; } = new List<Health>();
        public ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();
        public ICollection<Message> SentMessages { get; set; } = new List<Message>();
        public ICollection<Message> ReceivedMessages { get; set; } = new List<Message>();
        public GymMembership Subscription { get; set; }
    }

    // Gym Membership/Subscription Model
    public class GymMembership
    {
        public int SubscriptionId { get; set; }
        public int MemberId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string MembershipType { get; set; }
        public float Price { get; set; }
        public bool IsActive { get; set; }
        public bool AutoRenewal { get; set; }

        public Member Member { get; set; }
    }

    // Appointment Model
    public class Appointment
    {
        public int AId { get; set; }
        public int MemberId { get; set; }
        public int TrainerId { get; set; }
        public DateTime ADate { get; set; }
        public TimeSpan ATime { get; set; }
        public string Status { get; set; }

        public Member Member { get; set; }
        public Trainer Trainer { get; set; }
    }

    // Schedule Model
    public class Schedule
    {
        public int SId { get; set; }
        public int TrainerId { get; set; }
        public int MId { get; set; }
        public DateTime SDate { get; set; }
        public TimeSpan ExerciseId { get; set; }
        public string Name { get; set; }

        public Trainer Trainer { get; set; }
        public Member Member { get; set; }
        public ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
    }

    // Health Model
    public class Health
    {
        public int HId { get; set; }
        public int MId { get; set; }
        public int Calories { get; set; }
        public int SleepHours { get; set; }
        public int WaterIntake { get; set; }
        public int? TrainerId { get; set; }
        public DateTime HealthDate { get; set; }

        public Member Member { get; set; }
        public Trainer Trainer { get; set; }
    }

    // Exercise Model
    public class Exercise
    {
        public int EId { get; set; }
        public string ExerciseName { get; set; }
        public string EDescription { get; set; }
        public string Intensity { get; set; }
        public int Duration { get; set; }

        public ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();
    }

    // Attendance Model
    public class Attendance
    {
        public int AttendanceId { get; set; }
        public int MemberId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public TimeSpan CheckInTime { get; set; }
        public TimeSpan CheckOutTime { get; set; }

        public Member Member { get; set; }
    }

    // Message Model
    public class Message
    {
        public int MessageId { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string MessageContent { get; set; }
        public DateTime MessageDate { get; set; }
        public DateTime MessageDateTime { get; set; }
        public bool IsRead { get; set; }

        public Trainer SenderTrainer { get; set; }
        public Member SenderMember { get; set; }
    }

    // Payment Model
    public class Payment
    {
        public int PaymentId { get; set; }
        public int SubscriptionId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentMethod { get; set; }
        public string Status { get; set; }

        public GymMembership Subscription { get; set; }
    }
}
