using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymMembershipAPI.Data;
using GymMembershipAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GymMembershipAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembersController : ControllerBase
    {
        private readonly GymMembershipContext _context;

        public MembersController(GymMembershipContext context)
        {
            _context = context;
        }

        // GET: api/members
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Member>>> GetMembers()
        {
            return await _context.Members.Include(m => m.Trainer).ToListAsync();
        }

        // GET: api/members/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(int id)
        {
            var member = await _context.Members
                .Include(m => m.Trainer)
                .Include(m => m.HealthRecords)
                .Include(m => m.Appointments)
                .FirstOrDefaultAsync(m => m.MemberId == id);

            if (member == null)
            {
                return NotFound();
            }

            return member;
        }

        // POST: api/members
        [HttpPost]
        public async Task<ActionResult<Member>> PostMember(Member member)
        {
            _context.Members.Add(member);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMember", new { id = member.MemberId }, member);
        }

        // PUT: api/members/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMember(int id, Member member)
        {
            if (id != member.MemberId)
            {
                return BadRequest();
            }

            _context.Entry(member).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/members/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMember(int id)
        {
            var member = await _context.Members.FindAsync(id);
            if (member == null)
            {
                return NotFound();
            }

            _context.Members.Remove(member);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MemberExists(int id)
        {
            return _context.Members.Any(e => e.MemberId == id);
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class TrainersController : ControllerBase
    {
        private readonly GymMembershipContext _context;

        public TrainersController(GymMembershipContext context)
        {
            _context = context;
        }

        // GET: api/trainers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trainer>>> GetTrainers()
        {
            return await _context.Trainers.Include(t => t.Members).ToListAsync();
        }

        // GET: api/trainers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Trainer>> GetTrainer(int id)
        {
            var trainer = await _context.Trainers
                .Include(t => t.Members)
                .Include(t => t.Schedules)
                .Include(t => t.Appointments)
                .FirstOrDefaultAsync(t => t.TrainerId == id);

            if (trainer == null)
            {
                return NotFound();
            }

            return trainer;
        }

        // POST: api/trainers
        [HttpPost]
        public async Task<ActionResult<Trainer>> PostTrainer(Trainer trainer)
        {
            _context.Trainers.Add(trainer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTrainer", new { id = trainer.TrainerId }, trainer);
        }

        // PUT: api/trainers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTrainer(int id, Trainer trainer)
        {
            if (id != trainer.TrainerId)
            {
                return BadRequest();
            }

            _context.Entry(trainer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainerExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/trainers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrainer(int id)
        {
            var trainer = await _context.Trainers.FindAsync(id);
            if (trainer == null)
            {
                return NotFound();
            }

            _context.Trainers.Remove(trainer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TrainerExists(int id)
        {
            return _context.Trainers.Any(e => e.TrainerId == id);
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly GymMembershipContext _context;

        public AppointmentsController(GymMembershipContext context)
        {
            _context = context;
        }

        // GET: api/appointments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            return await _context.Appointments
                .Include(a => a.Member)
                .Include(a => a.Trainer)
                .ToListAsync();
        }

        // GET: api/appointments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var appointment = await _context.Appointments
                .Include(a => a.Member)
                .Include(a => a.Trainer)
                .FirstOrDefaultAsync(a => a.AId == id);

            if (appointment == null)
            {
                return NotFound();
            }

            return appointment;
        }

        // GET: api/appointments/member/5
        [HttpGet("member/{memberId}")]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetMemberAppointments(int memberId)
        {
            return await _context.Appointments
                .Where(a => a.MemberId == memberId)
                .Include(a => a.Trainer)
                .ToListAsync();
        }

        // POST: api/appointments
        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(Appointment appointment)
        {
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppointment", new { id = appointment.AId }, appointment);
        }

        // PUT: api/appointments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointment(int id, Appointment appointment)
        {
            if (id != appointment.AId)
            {
                return BadRequest();
            }

            _context.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        private bool AppointmentExists(int id)
        {
            return _context.Appointments.Any(e => e.AId == id);
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        private readonly GymMembershipContext _context;

        public HealthController(GymMembershipContext context)
        {
            _context = context;
        }

        // GET: api/health/member/5
        [HttpGet("member/{memberId}")]
        public async Task<ActionResult<IEnumerable<Health>>> GetMemberHealthRecords(int memberId)
        {
            return await _context.HealthRecords
                .Where(h => h.MId == memberId)
                .OrderByDescending(h => h.HealthDate)
                .ToListAsync();
        }

        // POST: api/health
        [HttpPost]
        public async Task<ActionResult<Health>> PostHealthRecord(Health health)
        {
            _context.HealthRecords.Add(health);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMemberHealthRecords", new { memberId = health.MId }, health);
        }
    }
}
